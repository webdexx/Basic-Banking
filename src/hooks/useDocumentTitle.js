import { useEffect } from "react"

export const useDocumentTitle = (title) => {
    useEffect(() => {
        const newTitle = `${title} - Basic Banking`;
        document.title = newTitle;
    }, [title]);
}