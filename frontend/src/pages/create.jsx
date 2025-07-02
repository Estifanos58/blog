import FancyButton from "@/components/custom/button.";
import CustomInput from "@/components/custom/input";
import CustomLabel from "@/components/custom/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Invalid image URL").optional(),
});

function CreateOrUpdate() {
  const [pendign, setPending] = useState(false);
  // const [content, setContent] = useState("");

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: "", // Optional
    },
  });
  const content = form.watch("content");

  const onSubmit = async (data) => {
    
    setPending(true);
    console.log("formData", data);
    // try {
    //   console.log("Submitting post...", data);
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (response.ok) {
    //     console.log("Post created successfully");
    //     // Optionally, redirect or reset the form
    //   } else {
    //     console.error("Failed to create post", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error creating post:", error);
    // } finally {
    //   setPending(false);
    // }
  };
  return (
    <div className="mx-40 mt-10 border-2 p-15">
      <div className="flex flex-col ">
        <h2 className="text-7xl text-center">Create Your Blog</h2>
        <p className="text-2xl text-center">Make a difference</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="mr-40">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <CustomLabel title={"title"} />
                  <FormControl>
                    <CustomInput placeholder="Enter your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className={"mt-5"}>
                  <CustomLabel title={"description"} />
                  <FormControl>
                    <CustomInput
                      placeholder="Enter your description"
                      className="input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <CustomLabel title={"Content"} />
                <FormControl>
                  <MDEditor
                    value={content}
                    onChange={(e) => form.setValue("content", e || "")}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    textareaProps={{
                      placeholder:
                        "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{ disallowedElements: ["style"] }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5">
            <FancyButton
              title="POST"
              type="button"
              noRelod={true}
              onClick={() => form.handleSubmit(onSubmit)()}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateOrUpdate;
