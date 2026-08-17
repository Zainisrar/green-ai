import KeySupplyCategories from "@/app/components/KeySupplyCategories/KeySupplyCategories";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function KeySupplyCategoriesPage() {
  return (
    <FigmaPageCanvas
      desktop={<KeySupplyCategories canvas />}
      mobile={<KeySupplyCategories />}
      nodeId="7077:27873"
      fitCanvasHeight
    />
  );
}
