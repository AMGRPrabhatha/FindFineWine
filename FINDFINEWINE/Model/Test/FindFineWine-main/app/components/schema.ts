import { z } from 'zod'

export const FormDataSchema = z.object({
  
  Type: z.string().min(1, 'Country is required'),
  variety: z.string().min(1, 'Grape Variety is required'),
  occasion: z.string().min(1, 'Occation is required'),
  gender: z.string().min(1, 'Gender is required'),
  
})