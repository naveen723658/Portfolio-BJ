import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import storage from "@/firebase/storage";
import db from "@/firebase/firestore";
export const useFetchData = (
  childCollection,
  parentObject,
  parentCollection,
  field,
  value,
  orderby
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const dataRef = query(
        collection(
          doc(db, `/${parentCollection}/${parentObject}/`),
          `${childCollection}`
        ),
        orderby && orderBy(orderby, "desc")
      );
      const queryRef =
        field && value ? query(dataRef, where(field, "==", value)) : dataRef;
      getDocs(queryRef)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error : " + err);
        });
    };
    fetchData();
    return () => {
      setData(null);
    };
  }, [field, value]);
  return [data, loading];
};

export const useFetchImage = (address) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImage = async () => {
      const url = await getDownloadURL(ref(storage, address));
      setLoading(false);
      setImage(url);
    };
    fetchImage();
    return () => {
      setImage(null);
    };
  }, [address]);
  return [image, loading];
};
export const useFetchImages = (address) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImages = async () => {
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
    };
    fetchImages();
    return () => {
      setImage(null);
    };
  }, [address]);

  return [image, loading];
};

// hook to fetch all data from a sub-folder of particular folder from firebase storage
export const useFetchAllImages = (address) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (address) {
        const folderRef = ref(storage, `${address}/`);
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
      if (address) {
        const folderRef = ref(storage, `${address}`);
        const list = await listAll(folderRef);
        const folder = await Promise.all(
          list.prefixes.map(async (prefix) => {
            const folder = prefix.name;
            return folder;
          })
        );
        const meta = await Promise.all(
          folder.map(async (folderName) => {
            const listRef = ref(storage, `${address}/${folderName}`);
            const list = await listAll(listRef);
            const imageMeta = await Promise.all(
              list.items.map(async (itemRef) => {
                const category = folderName;
                const videoTitle = itemRef.name;
                const videoUrl = await getDownloadURL(itemRef);
                return { category };
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
    console.log(new Set(imageMeta.map((object) => object.category)));
    return () => {
      setImageMeta([]);
    };
  }, [address]);

  return [imageMeta, loading];
};
