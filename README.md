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



# ToDo

- [ ] pretty sure `question/[...requestedQuestion]` should not be spread
- [ ] initial render of Q pages is slow as heck, investigate
- [ ] fix up the overly long breadcrumbs for aws Q's
- [ ] stretch 'submit' button on mobile view
- [ ] 'next' when last question in a section should not take you to the next section (e.g. AWS > JS)
- [ ] add 'edit this question' github link from Q page
- [ ] add 'discuss this question' - link to GitHub Q&A (not sure how that works yet)
- [ ] add icon links in footer
- [ ] extract base layout
  - [ ] extract Head
  - [ ] move footer into appropriate place

## Done

- [x] separate AWS / JS questions dynamically
- [x] add github link from main page
- [x] add some form of analytics, ideally not GA - well, it's GA for now. Open to alternatives.
- [x] extract footer



### Static build dump 6q's 

Info to determine if adding another Q bumps up the first load JS for all ? 

Feels like something is wrong using YAML with SSG

```
Page                                                                                                                                                                          Size     First Load JS
┌ ● /                                                                                                                                                                         803 B          78.8 kB
├   /_app                                                                                                                                                                     0 B            75.6 kB
├ ○ /404                                                                                                                                                                      193 B          75.7 kB
├ λ /api/answer                                                                                                                                                               0 B            75.6 kB
├ λ /api/questions                                                                                                                                                            0 B            75.6 kB
├ ● /question/[...requestedQuestion] (6399 ms)                                                                                                                                277 kB          355 kB
├   ├ /question/%2Fquestion%2Fjavascript%2Ftopic (752 ms)
├   ├ /question/%2Fquestion%2Fjavascript%2F0000003-whos-who (729 ms)
├   ├ /question/%2Fquestion%2Faws-certified-developer-associate-dva-c01%2Ftopic (718 ms)
├   ├ /question/%2Fquestion%2Fjavascript%2F0000005-right-or-wrong-message (714 ms)
├   ├ /question/%2Fquestion%2Fjavascript%2F0000004-tricky-closure (710 ms)
├   ├ /question/%2Fquestion%2Faws-certified-developer-associate-dva-c01%2F0000001-implement-a-secure-way-to-store-and-automatically-rotate-the-database-credentials (700 ms)
├   ├ /question/%2Fquestion%2Fjavascript%2F0000001-lost-in-parameters (685 ms)
├   └ /question/%2Fquestion%2Fjavascript%2F0000002-closures-raise-your-hand (657 ms)
└ ● /topic/[requestedTopic]                                                                                                                                                   818 B          78.8 kB
    ├ /topic/aws-certified-developer-associate-dva-c01
    └ /topic/javascript
+ First Load JS shared by all                                                                                                                                                 75.6 kB
  ├ chunks/framework-4556c45dd113b893.js                                                                                                                                      45.2 kB
  ├ chunks/main-fc7d2f0e2098927e.js                                                                                                                                           28.7 kB
  ├ chunks/pages/_app-8bf1f1d83c33eafd.js                                                                                                                                     809 B
  ├ chunks/webpack-9b312e20a4e32339.js                                                                                                                                        836 B
  └ css/cf4bb770e02110ae.css                                                                                                                                                  9.68 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)

```