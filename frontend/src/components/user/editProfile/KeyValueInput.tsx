import { FC } from 'react'
import { Input } from "@/components/ui/input"

interface KeyValueInputProps {
  index: number;
  value: { platform: string; url: string };
  onChange: (index: number, platform: string, url: string) => void;
}

const KeyValueInput: FC<KeyValueInputProps> = ({ index, value, onChange }) => (
  <div className="flex gap-2">
    <Input
      placeholder="Platform (e.g., Twitter)"
      value={value.platform}
      onChange={(e) => onChange(index, e.target.value, value.url)}
    />
    <Input
      placeholder="URL"
      value={value.url}
      onChange={(e) => onChange(index, value.platform, e.target.value)}
    />
  </div>
);

export default KeyValueInput;
