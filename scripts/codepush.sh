
#example script create app distribute release
# command: yarn release $1 $2 $3
#eg:
  # ios: yarn release ios Production ~1.2.3
  # android: yarn release android Staging ~1.2.3

# [version example target_version]:
# Range Expression	Who gets the update
# 1.2.3	Only devices running the specific binary version 1.2.3 of your app
# *	Any device configured to consume updates from your CodePush app
# 1.2.x	Devices running major version 1, minor version 2, and any patch version of your app
# 1.2.3 - 1.2.7	Devices running any binary version between 1.2.3 (inclusive) and 1.2.7 (inclusive)
# >=1.2.3 <1.2.7	Devices running any binary version between 1.2.3 (inclusive) and 1.2.7 (exclusive)
# 1.2	Equivalent to >=1.2.0 <1.3.0
# ~1.2.3	Equivalent to >=1.2.3 <1.3.0
# ^1.2.3	Equivalent to >=1.2.3 <2.0.0


os_platform=$1 # android/ios
deployment=$2 # Production/Staging/Development
target_version=$3; # version [version example target_version]

android(){
    appcenter codepush release-react -a DuyVu/Manage-User -d $deployment -t $target_version --mandatory
}
ios(){
    appcenter codepush release-react -a DuyVu/Manage-User -d $deployment -t $target_version --mandatory
}

if [ $os_platform = android ]
then
  android
fi

if [ $os_platform = ios ]
then
  ios
fi

# clean
#  appcenter codepush deployment clear -a DuyVu/Manage-User Staging || Production
