/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/e2e-utils/jest.config.js',
      "testTimeout": 1800000,
    },
    jest: {
      setupTimeout: 1800000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/Zingo.app',
      build: "xcodebuild -workspace ios/ZingoMobile.xcworkspace -scheme ZingoMobile -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build -destination 'platform=iOS Simulator,name=iPhone 14,OS=17.2'"
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/Zingo.app',
      build: "xcodebuild -workspace ios/ZingoMobile.xcworkspace -scheme ZingoMobile -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -destination 'platform=iOS Simulator,name=iPhone 14,OS=17.2'"
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.debug.x86_64': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-x86_64-debug.apk',
      build: 'cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.debug.x86': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-x86-debug.apk',
      build: 'cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.debug.arm64-v8a': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-arm64-v8a-debug.apk',
      build: 'cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.debug.armeabi-v7a': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-armeabi-v7a-debug.apk',
      build: 'cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android ; ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release ; cd -'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
        os: 'iOS 17.2'
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator_x86_64: {
      type: 'android.emulator',
      device: {
        avdName: 'android-30_google_apis_playstore_x86_64'
      }
    },
    emulator_x86: {
      type: 'android.emulator',
      device: {
        avdName: 'android-30_google_apis_playstore_x86'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.debug.x86_64': {
      device: 'attached',
      app: 'android.debug.x86_64'
    },
    'android.att.debug.x86': {
      device: 'attached',
      app: 'android.debug.x86'
    },
    'android.att.debug.arm64-v8a': {
      device: 'attached',
      app: 'android.debug.arm64-v8a'
    },
    'android.att.debug.armeabi-v7a': {
      device: 'attached',
      app: 'android.debug.armeabi-v7a'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator_x86',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator_x86',
      app: 'android.release'
    },
    'android.emu.x86_64': {
      device: 'emulator_x86_64',
      app: 'android.debug'
    },
    'android.emu.x86': {
      device: 'emulator_x86',
      app: 'android.debug'
    },
  }
};