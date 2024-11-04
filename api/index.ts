import { TagType } from "@/lib/types";
import { dryrun } from "@permaweb/aoconnect";

export async function readHandler(args: {
  processId: string;
  action: string;
  tags?: TagType[];
  data?: unknown;
}): Promise<unknown> {
  const tags = [{ name: "Action", value: args.action }];
  if (args.tags) tags.push(...args.tags);
  const data = JSON.stringify(args.data || {});

  const response = await dryrun({
    process: args.processId,
    tags: tags,
    data: data,
  });

  if (response.Messages && response.Messages.length) {
    if (response.Messages[0].Data) {
      return JSON.parse(response.Messages[0].Data);
    } else {
      if (response.Messages[0].Tags) {
        return response.Messages[0].Tags.reduce(
          (acc: Record<string, string>, item: TagType) => {
            acc[item.name] = item.value;
            return acc;
          },
          {}
        );
      }
    }
  }
}
