import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/useAuth'

import * as z from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Send } from 'lucide-react';
import { createRequest, respondToOffer } from '@/services/hiring'
import { HiringRequest as HiringRequestType } from '@/types/hiring'


type Category = {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

type City = {
  id: string
  name: string
}

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  category: z.string().min(1, 'La categoría es requerida'),
  subcategory: z.string().min(1, 'La subcategoría es requerida'),
  city: z.string().min(1, 'La ciudad es requerida'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  maxPrice: z.number().min(0, 'El precio máximo debe ser mayor a 0'),
  date: z.string().optional(),
  time: z.string().optional(),
  urgency: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  status: z.enum(['pending', 'accepted', 'rejected', 'completed']).optional(),
  userId: z.string().optional(),
  duration: z.string().optional(),
  id: z.string().optional(),
  responseCount: z.number().optional(),
  timeLeft: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

type OfferResponse = {
  offerId: string
  status: 'accept' | 'reject'
  price?: number
  message: string
  userId: string
}

export const RealTimeHiring = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [messageText, setMessageText] = useState('')
  const [selectedRequest] = useState<HiringRequestType | null>(null)
  const [showOfferDialog, setShowOfferDialog] = useState(false)
  const [showCreateRequest, setShowCreateRequest] = useState(false)
  const [categories] = useState<Category[]>([])
  const [cities] = useState<City[]>([])
  const [price] = useState(0)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      subcategory: '',
      city: '',
      description: '',
      maxPrice: 0,
      status: 'pending',
      urgency: 'normal'
    }
  })

  const handleCreateRequest = async (data: FormData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para crear una solicitud',
        variant: 'destructive'
      })
      return
    }

    try {
      const request: HiringRequestType = {
        ...data,
        id: crypto.randomUUID(),
        userId: user.id,
        status: 'pending',
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString(),
        urgency: 'normal',
        responseCount: 0,
        timeLeft: '24h'
      }

      await createRequest(request)

      toast({
        title: 'Éxito',
        description: 'Solicitud creada correctamente'
      })

      form.reset()
      setCurrentStep(0)
      setShowCreateRequest(false)
    } catch (error) {
      console.error('Error creating request:', error)
      toast({
        title: 'Error',
        description: 'Hubo un error al crear la solicitud',
        variant: 'destructive'
      })
    }
  }

  const handleOfferResponse = async (action: 'accept' | 'reject', offerPrice?: number) => {
    if (!selectedRequest || !user) return

    try {
      const response: OfferResponse = {
        offerId: selectedRequest.id,
        status: action,
        price: offerPrice,
        message: messageText,
        userId: user.id
      }

      await respondToOffer(response)

      toast({
        title: 'Éxito',
        description: `Oferta ${action === 'accept' ? 'aceptada' : 'rechazada'} correctamente`
      })

      setShowOfferDialog(false)
    } catch (error) {
      console.error('Error responding to offer:', error)
      toast({
        title: 'Error',
        description: 'Hubo un error al responder a la oferta',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {showCreateRequest ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateRequest)} className="space-y-8">
              {currentStep === 0 && (
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Escribe un título" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategoría</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una subcategoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories
                                ?.find((c) => c.id === form.getValues().category)
                                ?.subcategories?.map((sub) => (
                                  <SelectItem key={sub.id} value={sub.id}>
                                    {sub.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una ciudad" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities?.map((city) => (
                                <SelectItem key={city.id} value={city.id}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit">
                  {currentStep === 3 ? 'Crear solicitud' : 'Siguiente'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Button onClick={() => setShowCreateRequest(true)}>
            Crear nueva solicitud
          </Button>
        )}
      </div>

      <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Responder oferta</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOfferResponse('accept', price)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Aceptar Precio
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOfferResponse('accept', price)}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Contraofertar
              </Button>
            </div>
            <Textarea
              placeholder="Mensaje opcional..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RealTimeHiring