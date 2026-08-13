$imgs = @{
  'prop-labone-apt.jpg'     = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/cf3884af822482a76566ca324ffe3b87.jpg'
  'prop-aburi-land.jpg'     = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/81e00fd0e87eee1f381786a48f4ed966.jpg'
  'prop-eastlegon-ph.jpg'   = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/9627f335a0288134a98b31508198f614.jpg'
  'prop-trasacco-det.jpg'   = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/7a90b60f8056e70de6f05c9d932e032a.jpg'
  'prop-wtrasacco-7bed.jpg' = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/5d3bac09ca782800635fa9ccad97d33b.jpg'
  'prop-kumis-2bed.jpg'     = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/373b0e17cf06410b1ff7158077b89db9.jpg'
  'prop-eastlegon-6bed.jpg' = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/f57241629d7bbf8c77a0702bebb3fab9.jpg'
  'prop-akosombo-scenic.jpg'= 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/169d527daa2cd9a926b38c7324255415.jpg'
  'prop-akosombo-prime.jpg' = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/647cbf9433e880bbf2cf8bf518fd449d.jpg'
  'prop-akosombo-estate.jpg'= 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/db6a876f7e41658f59c183ef17770826.jpg'
  'prop-lakeside.jpg'       = 'https://s1.rea.global/img/400x320-fit/realtor_global/gh/70ba1f5be186128038f998cdbd29ce2a.jpg'
  'prop-rent-1bed.jpg'      = 'https://ghanapropertyfinder.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-23-at-2.19.45-PM-584x438.jpeg'
  'prop-rent-2bed.jpg'      = 'https://ghanapropertyfinder.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-21-at-12.19.55-PM-1-584x438.jpeg'
}

$client = New-Object System.Net.WebClient
$client.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
$client.Headers.Add('Referer', 'https://rea.global/')

foreach ($fname in $imgs.Keys) {
  $url = $imgs[$fname]
  $outpath = "images\$fname"
  try {
    $client.DownloadFile($url, $outpath)
    Write-Host "Downloaded: $fname"
  } catch {
    Write-Host "FAILED: $fname - $($_.Exception.Message)"
  }
}
Write-Host "Done."
