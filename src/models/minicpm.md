


To run this version of MiniCPM-o 2.6 it is necessary to:
- build a fork of `llamacpp` yourself (created by the same foundation that created the model)
- download the model files
- set environemnt variable for `LLAMACPP_PATH` and `MINICPM_PATH`

## Building the fork

```bash
git clone git@github.com:OpenBMB/llama.cpp.git
cd llama.cpp
git checkout minicpm-omni

cmake -B build
cmake --build build --config Release
```
Reference: https://github.com/OpenBMB/llama.cpp/blob/minicpm-omni/examples/llava/README-minicpmo2.6.md


## Downloading the model files

The files should be available on Hugging Face:

https://huggingface.co/openbmb/MiniCPM-o-2_6-gguf/resolve/main/Model-7.6B-Q4_K_M.gguf?download=true

https://huggingface.co/openbmb/MiniCPM-o-2_6-gguf/resolve/main/mmproj-model-f16.gguf?download=true

Repository: https://huggingface.co/openbmb/MiniCPM-o-2_6-gguf/tree/main