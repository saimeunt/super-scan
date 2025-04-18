import { type z } from "zod";
import {
  type UseFormReturn,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type formSchema } from "@/components/pages/verify-contract/verify-form";

const VerifyContractVerifyFormStandardJsonInput = ({
  form,
  fileRef,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  fileRef: UseFormRegisterReturn<"standardJsonInput">;
}) => (
  <Card>
    <CardContent className="p-4">
      <AccordionItem value="source-code">
        <AccordionTrigger>Upload Contract Source Code</AccordionTrigger>
        <AccordionContent>
          <FormField
            control={form.control}
            name="standardJsonInput"
            render={() => (
              <FormItem>
                <FormLabel>
                  Please select the Standard-Input-Json (*.json) file to upload
                </FormLabel>
                <FormControl>
                  <Input type="file" accept="application/json" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </CardContent>
  </Card>
);

export default VerifyContractVerifyFormStandardJsonInput;
