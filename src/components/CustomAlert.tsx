import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/stytesCustomAlert";

interface CustomAlertProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomAlert = ({
  isVisible,
  title,
  message,
  onClose,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Voltar",
}: CustomAlertProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel || onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>

          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={[styles.textStyle, styles.cancelText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;