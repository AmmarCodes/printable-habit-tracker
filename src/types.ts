export interface Habit {
  id: string;
  name: string;
}

export type PageSize = 'Letter' | 'A4' | 'A5' | 'Legal';

export interface PageSettings {
  pageSize: PageSize;
  rowsPerPage: number;
  showCheckboxes: boolean;
}

export type Direction = 'ltr' | 'rtl';

export type Locale = 'en' | 'ar';
