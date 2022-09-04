import { useIntl } from "react-intl";

type MergeMessages = (
  messages: Record<string, string>
) => Record<string, string>;

const useMergeMessages: MergeMessages = (messages) => {
  try {
    const intl = useIntl();
    const parentMessages = intl.messages as Record<string, string>;
    return { ...parentMessages, ...messages };
  } catch (error) {
    return messages;
  }
};

export default useMergeMessages;
