# 介紹
在網頁中顯示伺服器IP、客戶端IP並顯示ping。每次ping將傳送至discord webhook。
# 功能
連線至網頁，會提供您下面的資訊:  
![image](https://user-images.githubusercontent.com/68144494/226190505-a89d83d8-594f-473f-a96c-d55556fede17.png)  
並傳送至webhook  
![image](https://user-images.githubusercontent.com/68144494/226191531-f3b0f0bf-1085-44b2-afc3-ba248e56f2cc.png)
 
# 安裝
1. 需要先安裝nodeJS 18以上的版本  
2. 下載並解壓縮檔案  
3. 將server.js的 11、12行改掉
```javascript
const webhookId = '12345678'; //設定webhook ID
const webhookToken = 'abcdefghijk'; //設定webhook token
```
(webhook ID跟token去哪裡拿? 這裡有webhook範例網址: https:\//discord.com/api/webhooks/**ID**/**token**)    
  
4. 安裝套件
```
npm install
```
5. 打開來即可完成! (`node server.js`)  
6. 如果要放在systemctl裡面的話，這裡是`ping.service`的範例 (放在 `/etc/systemd/system/ping.service` 後 `systemctl enable ping && systemctl start ping`):  
```service
[Unit]
Description=CheapServer Edge PING

[Service]
User=root
WorkingDirectory=/root/edge-ping
LimitNOFILE=4096
ExecStart=/usr/bin/node /root/edge-ping/server.js
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```
# 特別感謝
本程式碼部分使用 GPT-4 編寫，這裡要說他比 GPT-3.5 好用多ㄌ
