import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/Charting/visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "scichart/types/AnchorPoint";
import { data } from './data';
import {RangeSelectionChartModifier} from "./RangeSelectionChartModifier";
async function initSciChart() {
  SciChartSurface.setRuntimeLicenseKey("HqJL/AOh5Uo7FqraZRRbTM9IAtVB62Rln6EyToeFCkEEdol4LJwOauAWAaGVlJta1+gJZczIzEKh06ZDUUhjL/0+rV5bbT0HDIMcDkgoveQ7kxYj8YNZQoDchW7166vo2bsZ5JuvIhGpU/EGl22dp5FbYB1YOf4ak9Zc0WmDpc70EEnrSBvL3Ixqtr0tkQbQeqOOzWoceMX7jQ1btWTEW9/uzfxiubvOGNRkRAgZJSQWIbJjQylW0kpromALcdBFRN4/VDdE9msl2sX0zojOXdDET+gsE6189mJ07k1B7nKWHEvqr7nmZ53niQo9G/LRLn0WtxebWGrzZfqYkX4p+3SIDNnQgwj+6PrYrpFwwP4PBUa8zV3WA8XiY+f6a9DxL7QDUtsWT7QdWPTXTHiWQ5cNBU+ELz2YFCzg1tsOI2m6XY2PbU3aVelq/DTyOQ0BnGcc/3GW6ZxgT2zsUt+9EiWI8QNwdDfEpZk9a0Jgv5u2ppqbEPdyidOPTCRg8Zj7E6YQhC3F2kTmYMpYWK3SAxqN+jZ4aqHEDCV2yoxN9/6ov/KZ3EASEs47g6MC4+OiLmCw5U0pRR3hr7GY+MHCjbGgAG9MutA1HMSLObOVIGkCmmpz5MWaG5l6e/a/OiG0PonW4IeZ22O8NwvR58Y79xLqi+hRUfv3725tLS7dMP1U9WUf771hqKxSkUhNlzCPVejtCOm36ur062PQDT4z/2sCDJTt1iyRe3XRQPRJ+A==");
  // Create the SciChartSurface in the div 'scichart-root'
  // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
  // instance must be passed to other types that exist on the same surface.
  const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root");
  // Create an X,Y Axis and add to the chart


  const xAxis = new NumericAxis(wasmContext);
  // xAxis.visibleRange = new NumberRange(0, 7000);
  sciChartSurface.xAxes.add(xAxis);
  const yAxis = new NumericAxis(wasmContext);
  // yAxis.visibleRange = new NumberRange(0, 6);
  sciChartSurface.yAxes.add(yAxis);

  yAxis.axisAlignmentProperty = "None";

  const mouseWheelZoomModifier = new MouseWheelZoomModifier();
  const zoomPanModifier = new ZoomPanModifier();
  const rubberBandZoomModifier = new RubberBandXyZoomModifier();
  const zoomExtentsModifier = new ZoomExtentsModifier();
  const rangeSelectionModifier = new RangeSelectionChartModifier();
  sciChartSurface.chartModifiers.add(zoomExtentsModifier);
  sciChartSurface.chartModifiers.add(zoomPanModifier);
  sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
  sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
  sciChartSurface.chartModifiers.add(rangeSelectionModifier);
  const inputEnablePan = document.getElementById("enable-pan");
  const inputEnableZoom = document.getElementById("enable-zoom");
  const inputEnableZoomToFit = document.getElementById("enable-zoom-to-fit");
  const inputEnableMouseWheel = document.getElementById("enable-mouse-wheel-zoom");
  const inputEnableRangeSelect = document.getElementById("enable-range-select");
  inputEnablePan.addEventListener("input", (event) => {
    zoomPanModifier.isEnabled = inputEnablePan.checked;
    rubberBandZoomModifier.isEnabled = !inputEnablePan.checked;
    rangeSelectionModifier.isEnabled = !inputEnablePan.checked;
    inputEnableZoom.checked = !inputEnablePan.checked;
    inputEnableRangeSelect.checked = !inputEnablePan.checked;
  });
  inputEnableZoom.addEventListener("input", (event) => {
    rubberBandZoomModifier.isEnabled = inputEnableZoom.checked;
    zoomPanModifier.isEnabled = !inputEnableZoom.checked;
    rangeSelectionModifier.isEnabled = !inputEnableZoom.checked;
    inputEnablePan.checked = !inputEnableZoom.checked;
    inputEnableRangeSelect.checked = !inputEnableZoom.checked;
  });
  inputEnableRangeSelect.addEventListener("input", (event) => {
    rangeSelectionModifier.isEnabled = inputEnableRangeSelect.checked;
    zoomPanModifier.isEnabled = !inputEnableRangeSelect.checked;
    rubberBandZoomModifier.isEnabled = !inputEnableRangeSelect.checked;
    inputEnablePan.checked = !inputEnableRangeSelect.checked;
    inputEnableZoom.checked = !inputEnableRangeSelect.checked;
  });

  inputEnableZoomToFit.addEventListener("input", (event) => {
    zoomExtentsModifier.isEnabled = inputEnableZoomToFit.checked;
  });
  inputEnableMouseWheel.addEventListener("input", (event) => {
    mouseWheelZoomModifier.isEnabled = inputEnableMouseWheel.checked;
  });


  sciChartSurface.chartModifiers.add(new RolloverModifier());

  sciChartSurface.annotations.add(
    // Add TextAnnotations in the top left of the chart
    new TextAnnotation({ text: "Annotations are Easy!", fontSize: 24, x1: 0.3, y1: 9.7 }),
    new TextAnnotation({ text: "You can create text", fontSize: 18, x1: 1, y1: 9 }),
    // Add TextAnnotations with anchor points
    new TextAnnotation({
      text: "Anchor Center (X1, Y1)",
      horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
      verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
      x1: 2,
      y1: 8
    }),
    new TextAnnotation({
      text: "Anchor Right",
      horizontalAnchorPoint: EHorizontalAnchorPoint.Right,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      x1: 2,
      y1: 8
    }),
    new TextAnnotation({
      text: "or Anchor Left",
      horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      x1: 2,
      y1: 8
    }),

  );


  // Declare a DataSeries
  const xyDataSeries1 = new XyDataSeries(wasmContext);
  const xyDataSeries2 = new XyDataSeries(wasmContext);
  const xyDataSeries3 = new XyDataSeries(wasmContext);
  const xyDataSeries4 = new XyDataSeries(wasmContext);
  const xyDataSeries5 = new XyDataSeries(wasmContext);
  const xyDataSeries6 = new XyDataSeries(wasmContext);

  (data.dps1).forEach((item, index) => {
    xyDataSeries1.append(index, item + 0);
  });

  (data.dps2).forEach((item, index) => {
    xyDataSeries2.append(index, item + 1);
  });
  (data.dps3).forEach((item, index) => {
    xyDataSeries3.append(index, item + 2);
  });
  (data.dps4).forEach((item, index) => {
    xyDataSeries4.append(index, item + 3);
  });

  (data.dps5).forEach((item, index) => {
    xyDataSeries5.append(index, item + 4);
  });

  (data.dps6).forEach((item, index) => {
    xyDataSeries6.append(index, item + 5);
  });



  // Add a line series to the SciChartSurface
  const lineSeries1 = new FastLineRenderableSeries(wasmContext);
  lineSeries1.strokeThickness = 2;
  lineSeries1.stroke = "rgba(255,0,0,1)";
  lineSeries1.dataSeries = xyDataSeries1;

  const lineSeries2 = new FastLineRenderableSeries(wasmContext);
  lineSeries2.strokeThickness = 2;
  lineSeries2.stroke = "rgba(255,0,0,1)";
  lineSeries2.dataSeries = xyDataSeries2;

  const lineSeries3 = new FastLineRenderableSeries(wasmContext);
  lineSeries3.strokeThickness = 2;
  lineSeries3.stroke = "rgba(255,0,0,1)";
  lineSeries3.dataSeries = xyDataSeries3;

  const lineSeries4 = new FastLineRenderableSeries(wasmContext);
  lineSeries4.strokeThickness = 2;
  lineSeries4.stroke = "rgba(255,0,0,1)";
  lineSeries4.dataSeries = xyDataSeries4;

  const lineSeries5 = new FastLineRenderableSeries(wasmContext);
  lineSeries5.strokeThickness = 2;
  lineSeries5.stroke = "rgba(255,0,0,1)";
  lineSeries5.dataSeries = xyDataSeries5;

  const lineSeries6 = new FastLineRenderableSeries(wasmContext);
  lineSeries6.strokeThickness = 2;
  lineSeries6.stroke = "rgba(255,0,0,1)";
  lineSeries6.dataSeries = xyDataSeries6;


  sciChartSurface.renderableSeries.add(lineSeries1);
  sciChartSurface.renderableSeries.add(lineSeries2);
  sciChartSurface.renderableSeries.add(lineSeries3);
  sciChartSurface.renderableSeries.add(lineSeries4);
  sciChartSurface.renderableSeries.add(lineSeries5);
  sciChartSurface.renderableSeries.add(lineSeries6);



  // sciChartSurface.zoomExtents();

}
initSciChart();








