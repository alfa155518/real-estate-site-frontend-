import { useState, useRef, ChangeEvent, useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PropertyData } from "@/types/admin/adminPropertiesStore";

interface UseAdminPropertiesFormParams {
    initialData?: Partial<PropertyData>;
    setValue: UseFormSetValue<PropertyData>;
    watch: UseFormWatch<PropertyData>;
}

export default function useAdminPropertiesForm({
    initialData,
    setValue,
    watch
}: UseAdminPropertiesFormParams) {
    const features = watch("features") || [];
    const tags = watch("tags") || [];
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    // Initialize form data with existing data for images and videos
    useEffect(() => {
        if (initialData?.images && Array.isArray(initialData.images)) {
            setValue("images", initialData.images);
        }

        if (initialData?.videos && Array.isArray(initialData.videos)) {
            setValue("videos", initialData.videos);
        }
    }, [initialData, setValue]);

    const addFeature = (feature: string) => {
        if (feature && !features.includes(feature)) {
            setValue("features", [...features, feature], { shouldDirty: true });
        }
    };

    const removeFeature = (feature: string) => {
        setValue(
            "features",
            features.filter((f) => f !== feature),
            { shouldDirty: true }
        );
    };

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            setValue("tags", [...tags, tag], { shouldDirty: true });
        }
    };

    const removeTag = (tag: string) => {
        setValue(
            "tags",
            tags.filter((t) => t !== tag),
            { shouldDirty: true }
        );
    };

    // Handle image change
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImagePreviews: string[] = [];
        const fileList = Array.from(files);

        fileList.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviews.push(reader.result as string);
                if (newImagePreviews.length === fileList.length) {
                    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
                    // Update form data with new files
                    const currentImages = watch("images") || [];
                    setValue("images", [...currentImages, ...fileList], { shouldValidate: true, shouldDirty: true });
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Handle remove image
    const handleRemoveImage = (index: number) => {
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);

        const currentImages = watch("images") || [];
        const newImages = [...currentImages];
        newImages.splice(index, 1);
        setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
    };

    // Handle video change
    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newVideoPreviews: string[] = [];
        const fileList = Array.from(files);

        fileList.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newVideoPreviews.push(reader.result as string);
                if (newVideoPreviews.length === fileList.length) {
                    setVideoPreviews((prev) => [...prev, ...newVideoPreviews]);
                    // Update form data with new video files
                    const currentVideos = watch("videos") || [];
                    setValue("videos", [...currentVideos, ...fileList], { shouldDirty: true });
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Handle remove video
    const handleRemoveVideo = (index: number) => {
        const newPreviews = [...videoPreviews];
        newPreviews.splice(index, 1);
        setVideoPreviews(newPreviews);

        const currentVideos = watch("videos") || [];
        const newVideos = [...currentVideos];
        newVideos.splice(index, 1);
        setValue("videos", newVideos, { shouldDirty: true });
    };


    return {
        handleImageChange,
        handleRemoveImage,
        handleVideoChange,
        handleRemoveVideo,
        videoInputRef,
        fileInputRef,
        imagePreviews,
        videoPreviews,
        features,
        tags,
        addFeature,
        removeFeature,
        addTag,
        removeTag,
    };
}