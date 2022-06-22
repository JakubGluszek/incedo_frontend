export interface INote {
  id: number,
  label: string,
  body: string,
  rank: number,
  notebook_id: number,
  created_at: number,
  updated_at: number
};

export interface INoteCreate {
  label: string | null,
  notebook_id: number
};