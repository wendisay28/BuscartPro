import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

export async function apiRequest<T = unknown>(
  method: string,
  url: string,
  data?: unknown,
  options: {
    headers?: Record<string, string>;
    noContentType?: boolean;
  } = {}
): Promise<T> {
  const { headers = {}, noContentType = false } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      ...(!noContentType && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    credentials: 'include' as const,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, config);
  
  // Handle HTTP errors
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If we can't parse the error as JSON, use the status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // For 204 No Content responses, return null
  if (response.status === 204) {
    return null as unknown as T;
  }

  // Parse and return the response as JSON
  try {
    return await response.json() as T;
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    throw new Error('Error parsing server response');
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn = <T,>(
  options: {
    on401: UnauthorizedBehavior;
  }
): QueryFunction<T, QueryKey> => {
  return async ({ queryKey }) => {
    const [url] = queryKey as [string];
    try {
      return await apiRequest<T>('GET', url);
    } catch (error) {
      if (error instanceof Error && error.message.includes('401') && options.on401 === 'returnNull') {
        return null as unknown as T;
      }
      throw error;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (except 408 and 429)
        if (error?.message?.match(/^4\d{2}/) && 
            !error.message.startsWith('408') && 
            !error.message.startsWith('429')) {
          return false;
        }
        return failureCount < 3; // Retry up to 3 times for other errors
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Use gcTime instead of cacheTime in newer versions of @tanstack/react-query
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: false,
    },
  },
});
