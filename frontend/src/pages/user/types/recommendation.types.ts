export type Recommendation = {
    id: string;
    title: string;
    content: string;
    likes: number;
    user: {
      id: string;
      name: string;
    };
    createdAt: string;
  };
  