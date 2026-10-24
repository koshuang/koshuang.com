---
title: "AI coding 最後會把工程師推回需求與架構"
description: "當寫 code 的成本持續下降，工程師真正稀缺的能力會往需求、架構、判斷與驗證移動。"
pubDate: 2026-10-24
---

我最近越來越強烈地感覺到一件事：AI coding 的終點，可能不是工程師花更少時間跟人溝通，而是剛好相反。

一開始使用 AI coding 時，最明顯的變化是「自己可以做更多」。原本要切給不同工程師、等排程、等 implementation 的事情，現在一個人搭配 AI 就能快速完成。這很自然會讓我們覺得，未來工程師之間的互動應該會變少。

但當我開始把 prompt、skills、harness、context engineering、loop engineering、review gate、evidence 都補起來之後，我看到的方向反而是：**implementation 逐漸變便宜，而「到底要做什麼、為什麼做、做到什麼程度才算完成」變得更貴。**

## 第一階段：AI 幫你寫 code

最早的價值很好理解。你描述需求，AI 補 function、寫 test、改 bug、產 boilerplate。

這個階段，人還是在 implementation loop 裡。差別只是打字速度變快、查資料變少、一次能處理更多細節。

如果只停在這裡，AI 很像更強的 autocomplete。

## 第二階段：AI 開始接手 execution loop

真正的變化發生在 AI 不再只是回答「這段 code 怎麼寫」，而是能自己讀 repo、理解 issue、修改 code、跑 test、看 CI、處理 review，再根據結果繼續下一步。

GitHub 在 2025 年公開描述的方向，就是從 pair programmer 往能獨立處理 issue、review code 的 peer programmer 移動；後來 Agent HQ 更直接把多 agent 的 assign、steer、track 做成開發流程的一部分。

這時候人的工作開始從「每一步怎麼做」移到「我要給它什麼環境，才能讓它可靠地一直做下去」。

所以我們開始談的不只是 prompt，而是：

- skills：把可重用的判斷與流程沉澱下來；
- context engineering：讓 agent 每次拿到正確而且足夠的上下文；
- harness：把工具、權限、測試、review、state 接起來；
- loop engineering：讓 execution → evidence → feedback → next action 可以持續閉環；
- guardrails：讓 agent 知道什麼能自主做，什麼一定要停下來找人。

這些東西做好之後，人反而可以逐漸退出 implementation loop。

## 第三階段：瓶頸往前移

這也是我覺得最容易被低估的地方。

當 implementation throughput 上升，系統不會自動變得更有價值。瓶頸只會往前移。

以前一個模糊需求丟給工程師，工程師可能花兩天寫完；需求品質差造成的浪費，最多就是那兩天。當 agent 可以同時跑很多工作，一個錯誤的需求、錯誤的 architecture assumption，反而可以更快產生大量「看起來完成」的結果。

所以越到後面，我越在意這幾件事：

1. **Intent 是否清楚？** 我們真正想改善的 user / business outcome 是什麼？
2. **Acceptance Criteria 是否真的可驗證？** 還是只是把需求換句話說？
3. **Architecture boundary 是否正確？** AI 很會在既有框架裡完成任務，但如果框架本身錯了，它也可能很有效率地把錯誤擴大。
4. **Evidence 是否足以支持 Done？** implementation、PR opened、CI green 都不是 outcome 本身。
5. **哪些 decision 應該留給人？** 價值選擇、重大 trade-off、風險承擔與不可逆決策，不應該因為 agent 能執行就自動交出去。

這些問題本質上都不是「coding 問題」。它們比較接近產品、系統設計、組織溝通與判斷。

## 這不代表 AI 已經讓所有工程師變快

這裡要小心一個常見跳躍：agent 能做更多，不等於每一種軟體工作都已經得到相同的 productivity uplift。

METR 在 2025 年針對 16 位熟悉大型 open-source codebase 的資深開發者做隨機實驗，當時使用 AI 的組別完成任務反而平均慢了 19%。這個結果不能外推成「AI coding 沒用」；研究本身也明確限制了適用範圍。

更重要的是，METR 在 2026 年更新實驗設計時指出，agentic tools 的普及已讓「不用 AI」的對照組越來越難維持，新的資料也受到 selection effect 影響。他們認為早期 2026 的開發者很可能比早期 2025 得到更多 AI 加速，但無法可靠估計幅度。

同年另一份針對 349 位 technical workers 的調查，受訪者自陳 AI 帶來的工作價值 uplift 中位數落在 1.4–2x；METR 同樣提醒，自陳數字不能直接當成客觀 productivity measurement。

對我來說，這些研究真正有意思的地方不是要證明「AI 到底快幾倍」，而是提醒我們：**當工具與工作方式都快速變化，只看 code throughput 會越來越不足。**

## 工程師不會消失，但工作的重心會改變

如果 AI 把 implementation cost 壓低，我不認為結論是「工程師不需要溝通」。

我的推論反而是：

**越能把 execution 交給 AI，人就越需要把時間放在定義問題、建立共識、做 architecture decision、設計 feedback loop，以及判斷結果到底有沒有價值。**

也就是說，AI coding 的成熟路徑可能長這樣：

> 寫 code → 指揮 AI 寫 code → 設計 AI 能可靠工作的系統 → 把注意力重新放回問題本身。

這也是為什麼我現在做 AI coding，花在 prompt 本身的心力反而沒有以前那麼高。真正值得投資的是讓系統可以持續執行、留下 evidence、自己發現下一步；而我自己則逐漸回到 business、product、requirements、architecture 與人的溝通。

這看起來像是繞了一圈。

但其實不是回到 AI 以前的工作方式。以前我們花很多溝通，是因為 implementation capacity 有限，需要協調人力；未來我們可能花更多高品質溝通，是因為 implementation capacity 變得便宜，**真正稀缺的是好的問題、好的判斷，以及對「什麼值得做」的共識。**

---

### 延伸資料

- GitHub, [From pair to peer programmer: our vision for agentic workflows in GitHub Copilot](https://github.blog/news-insights/product-news/from-pair-to-peer-programmer-our-vision-for-agentic-workflows-in-github-copilot/), 2025-06-25.
- GitHub, [Introducing Agent HQ: Any agent, any way you work](https://github.blog/news-insights/company-news/welcome-home-agents/), 2025-10-28.
- METR, [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), 2025-07-10.
- METR, [We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/), 2026-02-24.
- METR, [Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity](https://metr.org/blog/2026-05-11-ai-usage-survey/), 2026-05-11.
