---
title: {{ replace .File.ContentBaseName "-" " " | title }}
presenter:
date: {{ .Date | time.Format "2006-01-02 15:04:05 Z07:00" }}
location: P.01
coverUrl:
coverAlt:
published: {{ .Date | time.Format "2006-01-02 15:04:05 Z07:00" }}
---
