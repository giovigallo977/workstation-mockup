import * as Select from "@radix-ui/react-select";

export default function MHSelect({ value, onValueChange, options, ariaLabel }) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="mh-select-trigger" aria-label={ariaLabel}>
        <Select.Value />
        <Select.Icon>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12 2 6h12l-6 6z" /></svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="mh-select-content" position="popper" sideOffset={4}>
          <Select.Viewport className="mh-select-viewport">
            {options.map(opt => (
              <Select.Item key={opt} value={opt} className="mh-select-item">
                <Select.ItemText>{opt}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
