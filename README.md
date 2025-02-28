This repository was created to help compare the accuracy of handwritten text recognition.

The images used on the comparison are stored on the `images` folder and the ground truth
is stored on a JSON file at `images/_ground_truth.json`.

The `example` folder is a path to a image that is being used as an example for the model.

For requirements how to run each model take a loot into `src/models/<model_name>.md`

## Commands

### test \<model_name\> [-a]

When calling this command the utility tries to find the class export on `src/models` folder. 

> E.g.: `test minicpm` will load the `src/models/minicpm.ts` file

The file will be loaded and the `run` function will be called for each image and stored on a new CSV file with a `{model_name}_{timestamp}` format.

When the `-a` option is used to append the result to the last created CSV for that model, in that way it is possible to interrupt and continue later. The process will skip the images that are already stored in the CSV.


### compare

TODO

## How to add new model candidate

Create a new file on `src/models` with the name of model with a `run` command.


## How to add new images to the dataset

Add the image to the `images` folder and the ground truth to the `_ground_truth.json` file using the image name as the key.