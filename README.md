Welcome to the open source code repo for https://thetechnicalinterview.com/

This project is to practice technical questions often found in second stage / technical interviews. 

New questions are very welcome. 

## How To Add A New Question

Questions are created from [YAML files](https://github.com/a6software/thetechnicalinterview.com/tree/main/lib/question), using [GitHub flavoured Markdown](https://github.github.com/gfm/) syntax. 

To add a new question, the simplest way is to copy an existing question, delete all the existing stuff and then add in your own question / answer info instead.

Be sure to [lint the contents of your YAML file](http://www.yamllint.com/).

Then put in a PR. The rest happens by magic / the work experience kid at Vercel.

## Local dev

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

