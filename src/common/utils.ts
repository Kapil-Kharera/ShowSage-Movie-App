export const createImageUrl = (path: string, width: number) => {
    return `${import.meta.env.VITE_BASE_IMAGE_URI}/w${width}/${path}`;
};