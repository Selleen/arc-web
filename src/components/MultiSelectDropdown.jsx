import { Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

function MultiSelectDropdown({
  title,
  options,
  selectedValues,
  setSelectedValues,
}) {
  const items = options.map((opt) => ({
    key: opt.value,
    label: opt.label,
  }));

  const menuProps = {
    items,
    selectable: true,
    multiple: true,
    selectedKeys: selectedValues,
    onSelect: ({ key }) => {
      if (!selectedValues.includes(key)) {
        setSelectedValues([...selectedValues, key]);
      }
    },
    onDeselect: ({ key }) => {
      setSelectedValues(selectedValues.filter((v) => v !== key));
    },
  };

  return (
    <Dropdown menu={menuProps} trigger={["click"]}>
      <div
        className="filter-trigger-button"
        onClick={(e) => e.preventDefault()}
      >
        <Space>
          <span>{title}</span>

          {selectedValues.length > 0 && (
            <span className="filter-count-badge">
              {selectedValues.length}
            </span>
          )}

          <DownOutlined />
        </Space>
      </div>
    </Dropdown>
  );
}

export default MultiSelectDropdown; 