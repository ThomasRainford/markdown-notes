import { commands, ICommand } from "@uiw/react-md-editor";

export const MDEditorCommands: ICommand<string>[] = [
   commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
      name: "title",
      groupName: "title",
      buttonProps: { 'aria-label': 'Insert title' }
   }),
   commands.group([commands.bold, commands.italic, commands.strikethrough], {
      name: "Emphasis",
      groupName: "Emphasis",
      buttonProps: { 'aria-label': 'Insert emphasis' }
   }),
   commands.group([commands.orderedListCommand, commands.unorderedListCommand, commands.checkedListCommand], {
      name: "Lists",
      groupName: "List",
      buttonProps: { 'aria-label': 'Insert list' }
   }),
   commands.group([commands.code, commands.codeBlock], {
      name: "code",
      groupName: "code",
      buttonProps: { 'aria-label': 'Insert code' }
   }),
   commands.link,
   commands.image,
   // TODO: Add table command
   commands.quote,
   commands.hr
]