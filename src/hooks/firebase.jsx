import { getDownloadURL, ref, listAll } from "firebase/storage";
import storage from "@/firebase/storage";
import { useEffect, useState } from "react";
export const useFetchAllImages = (address) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (address.split("/").includes("All")) {
        const folderRef = ref(storage, `${address.split("/")[0]}/`);
        const list = await listAll(folderRef);
        const folder = await Promise.all(
          list.prefixes.map(async (prefix) => {
            const folder = prefix.name;
            return folder;
          })
        );
        const url = await Promise.all(
          folder.map(async (folderName) => {
            const listRef = ref(
              storage,
              `${address.split("/")[0]}/${folderName}`
            );
            const list = await listAll(listRef);
            const url = await Promise.all(
              list.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return url;
              })
            );
            return url;
          })
        );
        const flattenedUrl = url.flat();
        setImage(flattenedUrl);
        setLoading(false);
      } else {
        const listRef = ref(storage, address);
        const list = await listAll(listRef);
        const url = await Promise.all(
          list.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
          })
        );
        setImage(url);
        setLoading(false);
      }
    };

    fetchImages();

    return () => {
      setImage(null);
    };
  }, [address]);

  return [image, loading];
};

export const useFetchAllImagesMeta = (address) => {
  const [imageMeta, setImageMeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (address.split("/").includes("All")) {
        const folderRef = ref(storage, `${address.split("/")[0]}/`);
        const list = await listAll(folderRef);
        const folder = await Promise.all(
          list.prefixes.map(async (prefix) => {
            const folder = prefix.name;
            return folder;
          })
        );
        const meta = await Promise.all(
          folder.map(async (folderName) => {
            const listRef = ref(
              storage,
              `${address.split("/")[0]}/${folderName}`
            );
            const list = await listAll(listRef);
            const imageMeta = await Promise.all(
              list.items.map(async (itemRef) => {
                const name = itemRef.name;
                const url = await getDownloadURL(itemRef);
                return { name, url };
              })
            );
            return imageMeta;
          })
        );
        const flattenedMeta = meta.flat();
        setImageMeta(flattenedMeta);
        setLoading(false);
      } else {
        const listRef = ref(storage, address);
        const list = await listAll(listRef);
        const imageMeta = await Promise.all(
          list.items.map(async (itemRef) => {
            console.log(itemRef.contentType);
            const name = itemRef.name;
            const url = await getDownloadURL(itemRef);
            return { name, url };
          })
        );
        setImageMeta(imageMeta);
        setLoading(false);
      }
    };

    fetchImages();

    return () => {
      setImageMeta([]);
    };
  }, [address]);

  return [imageMeta, loading];
};
