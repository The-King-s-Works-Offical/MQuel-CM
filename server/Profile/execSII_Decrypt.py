import os
import sys
import shutil

appDir = os.getcwd()
if len(sys.argv) >= 3:

    Sii = ".\\"+sys.argv[1]
    Profile = ''.join(sys.argv[2::]).replace(
        "\\\\", "\\").replace("_", " ") + "\\"
    shutil.copy("scripts/Managers/Profile/SII_Decrypt.exe",
                Profile+"/SII_Decrypt.exe")
    os.chdir(Profile)
    os.system(Sii + " profile.sii")
    print(os.getcwd())
    os.chdir(appDir)
    print(os.getcwd())
else:
    print("Yetersiz parametre!")
