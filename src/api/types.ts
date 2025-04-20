export interface Option {
  id: string;
  label: string;
}

export interface ContentItem {
  id: string;
  label: string;
  type: string;
  value: string;
  read_only: boolean;
  options: Option[];
}

interface Component {
  id: string;
  id_uuid: string;
  type_object: string;
  handler_type: boolean;
  folded: boolean;
  hidden: boolean;
  content: ContentItem[];
  target: string;
  description: string;
}

export interface Automation {
  id: string;
  target: string;
  id_uuid: string;
  type_object: string;
  handler_type: boolean;
  folded: boolean;
  hidden: boolean;
  content: ContentItem[];
  components: Component[];
}