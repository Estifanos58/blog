import FancyButton from "@/components/custom/button.";
import CustomInput from "@/components/custom/input";
import CustomLabel from "@/components/custom/label";
import { Button } from "@/components/ui/button";
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
import MDEditor, { title } from "@uiw/react-md-editor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import useStore from "../store/store";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Invalid image URL").optional(),
});

function CreateOrUpdate() {
  const [pending, setPending] = useState(false);
  const {updatePost} = useStore();

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: updatePost.title || "",
      description: updatePost.description || "",
      content: updatePost.content || "",
      image: updatePost.image || "", // Optional
    },
  });
  const content = form.watch("content");

  const onSubmit = async (data) => {
    setPending(true);
    console.log("formData", data);
    try {
      console.log("Submitting post...", data);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        data,
        { withCredentials: true }
      );
      console.log("Response:", response);
      if (response.status === 201) {
        setPending(false);
        console.log("Post created successfully");
        // Optionally, redirect or reset the form
      } else {
        setPending(false);
        console.error("Failed to create post", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setPending(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my_unsigned_preset");
    data.append("cloud_name", "duxn1hn1t");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duxn1hn1t/image/upload",
        data
      );
      if (response.status === 200) {
        const imageUrl = response.data.url;
        console.log("Uploaded image URL:", imageUrl);
        form.setValue("image", imageUrl); // ✅ Set form value
      }
    } catch (err) {
      console.error("Upload error", err);
    }
  };
  // console.log("form", form);
  return (
    <div className="mx-5 md:mx-20 lg:mx-40 mt-10 border-2 p-10 md:p-15">
      <div className="flex flex-col ">
        <h2 className="text-4xl md:text-7xl text-center">{updatePost.title ? "Edit Your Blog" :"Create Your Blog"}</h2>
        <p className="text-xl md:text-2xl text-center">Make a difference</p>
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
                    <CustomInput placeholder="Enter your title" field={field} />
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
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!updatePost.title && <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className={"mt-5"}>
                  <CustomLabel title={"Image"} />
                  <FormControl>
                    <Input type={"file"} onChange={handleFileUpload} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}
          </div>

          <FormField
            control={form.control}
            name="content"
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
              title={pending ? "Posting ..." :updatePost.title ? "Edit" : "Post"}
              type="submit"
              noRelod={true}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateOrUpdate;
