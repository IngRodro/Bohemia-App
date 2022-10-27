import { useCallback, useState } from 'react';

const useModal = (initialValue = false) => {
  const [visible, setVisible] = useState(initialValue);

  const onToggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const onHidden = useCallback(() => {
    setVisible(false);
  }, []);

  const onVisible = useCallback(() => {
    setVisible(true);
  }, []);

  return { visible, onToggle, onVisible, onHidden };
};

export default useModal;
