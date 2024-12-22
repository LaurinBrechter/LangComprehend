import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {getVideoData} from "@/actions/getVideoData"

export const ImportYoutubeFormSchema = z.object({
  youtubeLink: z.string().url(),
  targetLanguage: z.string(),
});

export default function ImportYoutubeVideoForm({
  email,
}: {
  email: string;
}) {
  const form = useForm<z.infer<typeof ImportYoutubeFormSchema>>({
    resolver: zodResolver(ImportYoutubeFormSchema),
    defaultValues: {
      youtubeLink: "",
      targetLanguage: "en",
    },
  });

  const onSubmit = (data: z.infer<typeof ImportYoutubeFormSchema>) => {
    getVideoData(data, email)
  };

  return (
    <Form {...form}>
      <form
        className="p-3 flex items-center gap-4 h-[10%]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="youtubeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube Link</FormLabel>
              <Input {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Form>
  );
}
