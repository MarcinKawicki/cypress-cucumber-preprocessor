import { Given } from "@cucumber/cucumber";
import path from "path";
import { promises as fs } from "fs";
import { insertValuesInConfigFile } from "../support/configFileUpdater";

async function updateJsonConfiguration(
  absoluteConfigPath: string,
  additionalJsonContent: any
) {
  const existingConfig = JSON.parse(
    (await fs.readFile(absoluteConfigPath)).toString()
  );

  await fs.writeFile(
    absoluteConfigPath,
    JSON.stringify(
      {
        ...existingConfig,
        ...additionalJsonContent,
      },
      null,
      2
    )
  );
}

Given("additional preprocessor configuration", async function (jsonContent) {
  const absoluteConfigPath = path.join(
    this.tmpDir,
    ".cypress-cucumber-preprocessorrc"
  );

  await updateJsonConfiguration(absoluteConfigPath, JSON.parse(jsonContent));
});

Given("additional Cypress configuration", async function (jsonContent) {
  await insertValuesInConfigFile(
    path.join(this.tmpDir, "cypress.config.js"),
    JSON.parse(jsonContent)
  );
});
