import { BatchItem } from "classificator";
import environmentDataset from "../../data/training/environment_dataset.json";
import fireAndRescueDataset from "../../data/training/fire_and_rescue_dataset.json";
import healthDataset from "../../data/training/health_dataset.json";
import publicOrderDataset from "../../data/training/public_order_dataset.json";
import publicWorksDataset from "../../data/training/public_works_dataset.json";
import telecommunicationDataset from "../../data/training/telecommunication_dataset.json";
import transportationDataset from "../../data/training/transportation_dataset.json";
import waterSupplyDataset from "../../data/training/water_supply_dataset.json";

export class DatasetService {
  public getDataset(): BatchItem[] {
    return [
      ...environmentDataset,
      ...fireAndRescueDataset,
      ...healthDataset,
      ...publicOrderDataset,
      ...publicWorksDataset,
      ...telecommunicationDataset,
      ...transportationDataset,
      ...waterSupplyDataset,
    ];
  }
}

export const datasetService = new DatasetService();
