/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, ScrollView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import Toast from 'react-native-simple-toast';

import RegText from '../Components/RegText';
import FadeText from '../Components/FadeText';
import BoldText from '../Components/BoldText';
import ZecAmount from '../Components/ZecAmount';
import { parseServerURI, serverUris } from '../../app/uris';
import Button from '../Button';
import { ThemeType } from '../../app/types';
import { ContextLoaded } from '../../app/context';

type SettingsProps = {
  closeModal: () => void;
  set_wallet_option: (name: string, value: string) => void;
  set_server_option: (server: string) => void;
};

type Memos = {
  value: string;
  text: string;
};

const Settings: React.FunctionComponent<SettingsProps> = ({ set_wallet_option, set_server_option, closeModal }) => {
  const context = useContext(ContextLoaded);
  const { wallet_settings, totalBalance, info, translate } = context;
  const MEMOS: Memos[] = translate('settings.memos');
  const { colors } = useTheme() as unknown as ThemeType;

  const [memos, setMemos] = React.useState(wallet_settings.download_memos);
  const [filter, setFilter] = React.useState(wallet_settings.transaction_filter_threshold);
  const [server, setServer] = React.useState(wallet_settings.server);
  const [customIcon, setCustomIcon] = React.useState(farCircle);

  React.useEffect(() => {
    setCustomIcon(serverUris().find((s: string) => s === server) ? farCircle : faDotCircle);
  }, [server]);

  const saveSettings = async () => {
    if (
      wallet_settings.download_memos === memos &&
      wallet_settings.server === server &&
      wallet_settings.transaction_filter_threshold === filter
    ) {
      Toast.show(translate('settings.nochanges'), Toast.LONG);
      return;
    }
    if (!memos) {
      Toast.show(translate('settings.ismemo'), Toast.LONG);
      return;
    }
    if (!filter) {
      Toast.show(translate('settings.isthreshold'), Toast.LONG);
      return;
    }
    if (!server) {
      Toast.show(translate('settings.isserver'), Toast.LONG);
      return;
    }
    const result = parseServerURI(server);
    if (result.toLowerCase().startsWith('error')) {
      Toast.show(translate('settings.isuri'), Toast.LONG);
      return;
    }

    if (wallet_settings.download_memos !== memos) {
      set_wallet_option('download_memos', memos);
    }
    if (wallet_settings.transaction_filter_threshold !== filter) {
      set_wallet_option('transaction_filter_threshold', filter);
    }
    if (wallet_settings.server !== server) {
      set_server_option(server);
    }

    closeModal();
  };

  //console.log(wallet_settings);

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: '100%',
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 10,
          backgroundColor: colors.card,
          zIndex: -1,
          paddingTop: 10,
        }}>
        <Image
          source={require('../../assets/img/logobig-zingo.png')}
          style={{ width: 80, height: 80, resizeMode: 'contain' }}
        />
        <ZecAmount
          currencyName={info?.currencyName ? info.currencyName : ''}
          size={36}
          amtZec={totalBalance.total}
          style={{ opacity: 0.5 }}
        />
        <RegText color={colors.money} style={{ marginTop: 5, padding: 5 }}>
          {translate('settings.title')}
        </RegText>
        <View style={{ width: '100%', height: 1, backgroundColor: colors.primary }} />
      </View>

      <ScrollView
        style={{ maxHeight: '85%' }}
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}>
        <View style={{ display: 'flex', margin: 10 }}>
          <BoldText>{translate('settings.server-title')}</BoldText>
        </View>

        <View style={{ display: 'flex', marginLeft: 25 }}>
          {serverUris().map((uri: string) => (
            <TouchableOpacity
              key={'touch-' + uri}
              style={{ marginRight: 10, marginBottom: 5, maxHeight: 50, minHeight: 48 }}
              onPress={() => setServer(uri)}>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <FontAwesomeIcon icon={uri === server ? faDotCircle : farCircle} size={20} color={colors.border} />
                <RegText key={'tex-' + uri} style={{ marginLeft: 10 }}>
                  {uri}
                </RegText>
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ marginRight: 10, marginBottom: 5, maxHeight: 50, minHeight: 48 }}
              onPress={() => setServer(undefined)}>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                {customIcon && <FontAwesomeIcon icon={customIcon} size={20} color={colors.border} />}
                <RegText style={{ marginLeft: 10 }}>{translate('settings.custom')}</RegText>
              </View>
            </TouchableOpacity>

            {customIcon === faDotCircle && (
              <View
                accessible={true}
                accessibilityLabel={translate('settings.server-acc')}
                style={{
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginLeft: 5,
                  width: 'auto',
                  maxWidth: '80%',
                  maxHeight: 48,
                  minWidth: '50%',
                  minHeight: 48,
                }}>
                <TextInput
                  placeholder={'... http------.---:--- ...'}
                  placeholderTextColor={colors.placeholder}
                  style={{
                    color: colors.text,
                    fontWeight: '600',
                    fontSize: 18,
                    minWidth: '50%',
                    minHeight: 48,
                    marginLeft: 5,
                  }}
                  value={server}
                  onChangeText={(text: string) => setServer(text)}
                  editable={true}
                  maxLength={100}
                />
              </View>
            )}
          </View>
        </View>

        <View style={{ display: 'flex', margin: 10 }}>
          <BoldText>{translate('settings.threshold-title')}</BoldText>
        </View>

        <View style={{ display: 'flex', marginLeft: 25 }}>
          <View
            accessible={true}
            accessibilityLabel={translate('settings.threshold-acc')}
            style={{
              borderColor: colors.border,
              borderWidth: 1,
              marginLeft: 5,
              width: 'auto',
              maxWidth: '60%',
              maxHeight: 48,
              minWidth: '30%',
              minHeight: 48,
            }}>
            <TextInput
              placeholder={translate('settings.number')}
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              style={{
                color: colors.text,
                fontWeight: '600',
                fontSize: 18,
                minWidth: '30%',
                minHeight: 48,
                marginLeft: 5,
              }}
              value={filter}
              onChangeText={(text: string) => setFilter(text)}
              editable={true}
              maxLength={6}
            />
          </View>
        </View>

        <View style={{ display: 'flex', margin: 10 }}>
          <BoldText>{translate('settings.memo-title')}</BoldText>
        </View>

        <View style={{ display: 'flex', marginLeft: 25, marginBottom: 30 }}>
          {MEMOS.map(memo => (
            <View key={'view-' + memo.value}>
              <TouchableOpacity
                style={{ marginRight: 10, marginBottom: 5, maxHeight: 50, minHeight: 48 }}
                onPress={() => setMemos(memo.value)}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <FontAwesomeIcon
                    icon={memo.value === memos ? faDotCircle : farCircle}
                    size={20}
                    color={colors.border}
                  />
                  <RegText key={'text-' + memo.value} style={{ marginLeft: 10 }}>
                    {translate(`settings.value-${memo.value}`)}
                  </RegText>
                </View>
              </TouchableOpacity>
              <FadeText key={'fade-' + memo.value}>{memo.text}</FadeText>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <Button type="Primary" title={translate('settings.save')} onPress={saveSettings} />
        <Button type="Secondary" title={translate('cancel')} style={{ marginLeft: 10 }} onPress={closeModal} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;