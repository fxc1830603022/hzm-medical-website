import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonSchemaTypes, studioStructure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "dr_xiao_9d",
  title: "Dr. Xiao 9D Website CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure: studioStructure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => !singletonSchemaTypes.has(template.schemaType))
  },
  document: {
    actions: (actions, context) =>
      singletonSchemaTypes.has(context.schemaType)
        ? actions.filter((action) => action.action !== "duplicate" && action.action !== "delete")
        : actions
  }
});
