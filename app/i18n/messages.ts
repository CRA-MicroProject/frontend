type MessageEntry = {
  message?: string;
};

export function toIntlMessages(catalog: Record<string, MessageEntry>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(catalog).map(([key, value]) => [key, value.message ?? ""]),
  );
}
