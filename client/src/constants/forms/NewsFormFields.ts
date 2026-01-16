import { FieldConfig } from "@/components/shared/form/DynamicForm";

export const newsFormFields: FieldConfig[] = [
{
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    required: true,
  },
  {
    name: 'thumbnail',
    label: 'Thumbnail',
    type: 'image-upload',
    required: true,
  },
  {
    name: 'content',
    label: 'Content',
    type: 'richtext',
    required: true,
  },
  {
    name: 'published_date',
    label: 'Published Date',
    type: 'date',
    required: true,
  },
];