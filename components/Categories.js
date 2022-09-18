import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import client, { urlFor } from "../sanity";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client.fetch(`*[_type == "category"]`).then((data) => setCategories(data));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
        {categories?.map(category => (
            <CategoryCard 
                key={category._id}
                title={category.name}
                imgUrl={urlFor(category.image).width(200).url()}
            />
        ))}
    </ScrollView>
  );
};

export default Categories;
