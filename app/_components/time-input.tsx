interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <button
      onClick={() => {
        const input = document.createElement("input");
        input.type = "time";
        input.value = value;
        input.style.position = "absolute";
        input.style.left = "-9999px";
        document.body.appendChild(input);

        input.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;
          onChange(target.value);
          document.body.removeChild(input);
        });

        input.focus();
        input.click();
      }}
      className="bg-[#2e2d2d] hover:bg-[#1f1f1f] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 text-sm font-medium transition-all duration-200 min-w-[80px]"
    >
      {formatTime(value)}
    </button>
  );
};

export default TimeInput;
