import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Validate inputs and submit the post
    const handleSubmitPost = async () => {
        let hasError = false;

        // Validation checks
        if (title.length < 10) {
            setTitleError("Title must be at least 10 characters long.");
            hasError = true;
        } else {
            setTitleError("");
        }

        if (description.length < 10) {
            setDescriptionError("Description must be at least 10 characters long.");
            hasError = true;
        } else {
            setDescriptionError("");
        }
        if (hasError) return;

        try {
            setIsSubmitting(true);
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content: description,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="Title"
                />
                {
                    titleError && 
                    <p className="text-red-600 text-sm mt-1">{titleError}
                    </p>
                }

                <TextEditor onChange={(e) => setDescription(e.target.value)} />
                {descriptionError && (
                    <p className="text-red-600 text-sm mt-1">{descriptionError}</p>
                )}
                <button
                    onClick={handleSubmitPost}
                    disabled={isSubmitting}
                    type="submit"
                    className={`mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Publishing..." : "Publish post"}

                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
                </div>
            </div>
        </div>
    </div>

}
