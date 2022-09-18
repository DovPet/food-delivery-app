export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant Name",
      validation: (Rule) => Rule.required()
    },
    {
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "image",
      type: "image",
      title: "Image of Restaurant"
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of Restaurant"
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of Restaurant"
    },
    {
      name: "address",
      type: "string",
      title: "Address of Restaurant",
      validation: (Rule) => Rule.required()
    },
    {
      name: "rating",
      type: "number",
      title: "Rating of Restaurant",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a value between 1 and 5")
    },
    {
      name: "type",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required()
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
      validation: (Rule) => Rule.required()
    }
  ]
};
