cls
del wecheck.apk
copy "%cd%\platforms\android\build\outputs\apk\android-release-unsigned.apk" "%cd%\b2b.apk"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore b2b.keystore b2b.apk b2b