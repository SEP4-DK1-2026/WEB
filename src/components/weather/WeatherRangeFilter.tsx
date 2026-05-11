

type WeatherRangeFilterProps = {
  startDate: string;
  endDate: string;
  maxDate: string;
  minDate?: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSubmit: () => void;
  
};



export default function WeatherRangeFilter({
  startDate,
  endDate,
  minDate,
  maxDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}: WeatherRangeFilterProps) {

  const isInvalidRange = startDate > endDate
  return (
    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-blue-900">Vælg periode</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
          Fra dato
          <input
            type="date"
            value={startDate}
            min={minDate}
            max={maxDate}
            
            onChange={(event) => onStartDateChange(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
          Til dato
          <input
            type="date"
            value={endDate}
            min={minDate}
            max={maxDate}
            onChange={(event) => onEndDateChange(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <button
          type="button"
          disabled={isInvalidRange}
          onClick={onSubmit}
          className="self-end rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Vis data
        </button>
      </div>
    </div>
  );
}
