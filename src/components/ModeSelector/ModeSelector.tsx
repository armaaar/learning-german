import { useSearchParams } from "solid-app-router";
import { createSignal, Component } from "solid-js";
import { NavList } from "../NavList/NavList";

type Props = {
  modes: string[];
};

export const ModeSelector: Component<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pickSafeMode = (unsafeMode: string) =>
    props.modes.includes(unsafeMode) ? unsafeMode : props.modes[0];

  const [selectedMode, setSelectedMode] = createSignal(
    pickSafeMode(searchParams.mode)
  );

  const onModeSelect = (mode: string): void => {
    const safeMode = pickSafeMode(mode);
    setSelectedMode(safeMode);
    setSearchParams({ mode: safeMode });
  };

  return (
    <NavList
      list={props.modes}
      selected={selectedMode()}
      onSelect={onModeSelect}
    />
  );
};
