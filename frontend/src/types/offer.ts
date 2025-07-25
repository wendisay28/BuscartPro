export interface OfferFormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  budgetMin?: string;
  budgetMax?: string;
  modality: string;
  eventDate: string;
  eventTime: string;
  location: string;
  duration: string;
  additionalNotes?: string;
}
