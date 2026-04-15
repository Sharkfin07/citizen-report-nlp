import { datasetService } from "../../src/services/dataset_service";
import { classifierService } from "../../src";

classifierService.trainBatch(datasetService.getDataset());
classifierService.serialize("./data/state/state-v1.json");
