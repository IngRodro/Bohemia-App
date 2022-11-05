import Title from 'components/Atoms/Title';
import Button from 'components/Atoms/Button';
import {
  StyleActions,
  StyleWrapper,
  StyleRefreshIcon,
  StyledChildWrapper,
} from './style';

const HeaderPage = ({ title, onRefresh, child, onAdd }) => {
  return (
    <StyleWrapper>
      <Title htmlTag="h1" size={48} lineHeight={75}>
        {title}
      </Title>
      <StyledChildWrapper>{child}</StyledChildWrapper>
      <StyleActions>
        {onRefresh && (
          <Button color="info" labelColor="white" onClick={onRefresh}>
            <StyleRefreshIcon size={40} />
          </Button>
        )}
        {onAdd && (
          <Button labelColor="white" onClick={onAdd}>
            Agregar
          </Button>
        )}
      </StyleActions>
    </StyleWrapper>
  );
};

export default HeaderPage;
