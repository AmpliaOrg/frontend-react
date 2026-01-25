import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VolunteerFilterProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (value: string) => void;
}

export function VolunteerFilter({ tags, selectedTag, onTagChange }: VolunteerFilterProps) {
  return (
    <div className="w-full md:w-[250px]">
      <Select value={selectedTag} onValueChange={onTagChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por Habilidade/Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as Tags</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
